{
  buildPythonPackage,
  fetchPypi,
  lib,
  pythonOlder,

  # Build System
  setuptools,
  setuptools-scm,

  # Dependencies
  build,
  mkdocs,
  mkdocs-material,
  twine,
}:
buildPythonPackage rec {
  pname = "mkdocs-nav-weight";
  version = "0.3.0";
  format = "pyproject";

  disabled = pythonOlder "3.7";

  build-system = [
    setuptools
    setuptools-scm
  ];

  dependencies = [
    build
    mkdocs
    mkdocs-material
    twine
  ];

  src = fetchPypi {
    inherit version;
    pname = "mkdocs_nav_weight";
    sha256 = "sha256-5LZvBpOqHYuCh2cn88WmqjyFg0Bp39G16iNDL/PYYrs=";
  };

  meta = with lib; {
    license = licenses.mit;
  };
}
