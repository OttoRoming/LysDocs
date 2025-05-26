#import "/templates/diagram.typ": *
#show: diagram-style

#canvas({
  import draw: *
  set-style(content: (padding: .2), stroke: gray.lighten(70%))
  tree.tree(
    (
      {
        [
          Lysator
          `130.130`
        ]
        link("https://lysator.liu.se")[heh]
        image("/docs/assets/lyslogo.svg", height: 1cm)
      },
      ([B], [C], ([D],)),
      ([E], [F]),
    ),
    spread: 3,
    // grow: 1.5,
    name: "tree",
  )
})
