import * as path from "path";
import * as fs from "fs";
import * as ts from "typescript";
import { format } from "prettier";

const main = async () => {
  // Path to the file we're trying to compile, releative to cwd.
  const file = process.argv[2];

  // The filename without extension.
  const basename = path.basename(file, path.extname(file));

  // TODO: Load compiler options from tsconfig.json.
  const program = ts.createProgram([file], {
    target: ts.ScriptTarget.ES2018,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React,
    noEmit: true
  });

  // The checker is used to resolve symbols and types inside the source files.
  const checker = program.getTypeChecker();

  // Parse the source file and extract all components that are suitable candidates
  // for react-component-page.
  let module = "unknown";
  const components = [];
  const sourceFile = program.getSourceFiles().find(f => f.fileName === file);
  ts.forEachChild(sourceFile, visit);

  // Create the __doc__ directory into which we place the output files.
  const docPathBase = path.join(path.dirname(path.join(process.cwd(), file)), "__doc__");
  try {
    fs.mkdirSync(docPathBase);
  } catch (e) {
    // Ignore
  }

  const prelude = [`import { ${components.map(c => c.name).join(", ")} } from "../${basename}";`].join("\n");

  const toPageCode = (component): string => {
    console.log(component);
    return [
      `export const ${component.name}PageProps = {`,
      `  module: "${module}",`,
      `  componentName: \`${component.name}\`,`,
      `  headline: \`${component.documentation.split("\n")[0]}\`,`,
      `  Preview: ${component.name}["__catalogPreview__"],`,
      `  props: { name: "${component.props.name}", fields: [${component.props.fields.map(JSON.stringify)}] },`,
      `  defaultProps: {},`,
      `};`
    ].join("\n");
  };

  const result = prelude + "\n\n" + components.map(toPageCode).join("\n\n") + "\n";

  const outFile = path.join(docPathBase, `${basename}.components.tsx`);
  fs.writeFileSync(outFile, format(result, { parser: "typescript" }));

  function visit(node: ts.Node) {
    ts.getJSDocTags(node).forEach(tag => {
      if (module === "unknown" && tag.tagName.text === "module" && tag.comment) {
        module = tag.comment;
      }
    });

    if (ts.isClassDeclaration(node) && isNodeExported(node) && node.name) {
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        try {
          components.push(serializeClass(node, symbol));
        } catch (e) {
          console.warn(`Failed to serialize component ${symbol.getEscapedName()}: ${e.message}`);
        }
      }
    }
  }

  function serializeClass(node: ts.ClassDeclaration, symbol: ts.Symbol) {
    // The first type argument of React.Component are the props, we need that to get
    // to its members.
    const typeArg = node.heritageClauses[0].types[0].typeArguments[0];
    const typeArgSymbol = checker.getSymbolAtLocation((typeArg as any).typeName);

    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
      tags: symbol.getJsDocTags(),
      props: {
        name: typeArgSymbol.escapedName,
        fields: Array.from(typeArgSymbol.members.entries() as any).map(([k, v]) => {
          const t = checker.getTypeOfSymbolAtLocation(v, v.valueDeclaration!);
          const type = {
            name: checker.typeToString(t),
            module: ""
          };

          return {
            name: k,
            type,
            comment: {
              shortText: ts.displayPartsToString(v.getDocumentationComment())
            }
          };
        })
      }
    };
  }
};

const isNodeExported = (node: ts.Declaration): boolean =>
  (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
  (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);

main().then(
  () => {
    process.exit(0);
  },
  err => {
    console.error(err);
    process.exit(1);
  }
);
