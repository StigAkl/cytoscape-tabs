import { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";

const Graph = ({ elements, style, layout, updateElements }) => {
  const [cy, setCy] = useState(null);

  useEffect(() => {
    if (cy) {
      // Håndterer posisjonsendringer for noder
      cy.on("position", "node", (e) => {
        const updatedElements = cy.elements().map((ele) => ({
          data: ele.data(),
          position: ele.position(),
        }));
        updateElements(updatedElements); // Sender oppdaterte elementer tilbake til App
      });
    }
  }, [cy, updateElements]);

  return (
    <CytoscapeComponent
      elements={elements}
      style={style}
      layout={layout}
      cy={(instance) => setCy(instance)}
    />
  );
};

export default Graph;
