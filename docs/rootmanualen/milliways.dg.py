from diagrams import Diagram
from diagrams.generic.compute import Rack
from pathlib import Path

with Diagram(
    name="Milliways",
    filename=Path(__file__).stem,
    outformat="png",
    show=False,
    graph_attr={"bgcolor": "transparent"},
):
    Rack("hehe")
