import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Graph from "./Graph";

const initialElements = [
  { data: { id: "one", label: "Node 1" } },
  { data: { id: "two", label: "Node 2" } },
  { data: { id: "three", label: "Node 3" } },
  { data: { id: "four", label: "Node 4" } },
  { data: { id: "five", label: "Node 5" } },
  { data: { source: "one", target: "two" } },
  { data: { source: "one", target: "three" } },
  { data: { source: "two", target: "four" } },
  { data: { source: "three", target: "five" } },
];

const defaultLayout = { name: "circle" };

const App = () => {
  const [tabs, setTabs] = useState([
    { elements: initialElements, layout: defaultLayout },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addTab = () => {
    const currentElements = tabs[selectedIndex].elements.map((ele) => ({
      data: { ...ele.data },
      position: { ...ele.position },
    }));

    const newTabs = [
      ...tabs,
      { elements: currentElements, layout: { name: "preset" } },
    ];
    setTabs(newTabs);
    setSelectedIndex(newTabs.length - 1);
  };

  const updateElementsInTab = (index, newElements) => {
    const newTabs = [...tabs];
    newTabs[index] = {
      ...newTabs[index],
      elements: newElements,
      layout: {
        name: "preset",
      },
    };

    setTabs(newTabs);
  };

  return (
    <div>
      <button onClick={addTab}>Add New Tab</button>
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList>
          {tabs.map((_, index) => (
            <Tab key={index}>Graph {index + 1}</Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <Graph
              elements={tab.elements}
              layout={tab.layout}
              style={{ width: "100vw", height: "100vh" }}
              updateElements={(newElements) =>
                updateElementsInTab(index, newElements)
              }
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
