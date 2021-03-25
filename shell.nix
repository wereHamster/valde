let
  pkgs = import <nixpkgs> {};
  nodejs = pkgs.nodejs-14_x;

in pkgs.mkShell {
  buildInputs = [
    nodejs
  ];
}