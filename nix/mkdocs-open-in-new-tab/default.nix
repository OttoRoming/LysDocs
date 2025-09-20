{
  buildPythonPackage,
  fetchFromGitHub,
  lib,
  pythonOlder,

  # Build System
  setuptools,
  setuptools-scm,

  # Dependencies
  mkdocs,
}:
buildPythonPackage rec {
  pname = "mkdocs-open-in-new-tab";
  version = "2025-09-20";
  format = "pyproject";

  disabled = pythonOlder "3.7";

  build-system = [
    setuptools
    setuptools-scm
  ];

  dependencies = [
    mkdocs
  ];

  src = fetchFromGitHub {
    owner = "JakubAndrysek";
    repo = pname;
    rev = "51327e1ee069070e3dfbc2f81e5554e024c10344";
    sha256 = "sha256-5Wx9K6fjDxO2wtizQn6EuR6I+Z2aVPlPWgV5qYmuBVg=";
  };

  meta = with lib; {
    license = licenses.mit;
  };
}
