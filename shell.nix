let
  pkgs = import <nixpkgs> {};
  nodejs = pkgs.nodejs-10_x;

in pkgs.stdenv.mkDerivation {
  name = "valde";
  buildInputs = [
    nodejs
  ];
}