{
  description = "Provides a development shell for nix users.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      flake-utils,
      nixpkgs,
      self,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            (python3.withPackages (
              py-pkgs: with py-pkgs; [
                mkdocs
                mkdocs-git-authors-plugin
                mkdocs-git-revision-date-localized-plugin
                mkdocs-material
                self.packages.${system}.mkdocs-nav-weight
                self.packages.${system}.mkdocs-open-in-new-tab
              ]
            ))
          ];
        };

        packages = {
          mkdocs-open-in-new-tab = pkgs.python3Packages.callPackage ./mkdocs-open-in-new-tab/default.nix { };
          mkdocs-nav-weight = pkgs.python3Packages.callPackage ./mkdocs-nav-weight/default.nix { };
        };
      }
    );
}
