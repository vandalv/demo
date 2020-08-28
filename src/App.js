import React, { useState } from "react";
import data from "./data/p";
import MaterialTable from "material-table";
import OLMapFragment from "./components/OLMapFragment";
import { Grid } from "@material-ui/core";

function App() {
  const [features, setFeatures] = useState(data.features);

  // React.useEffect(() => {
  // formateData();
  // }, []);
  // const formateData = () => {
  //   let datalist = data.features;
  //   const formatedFeatures = [];
  //   datalist.forEach((el) => {
  //     formatedFeatures.push({ ...el.properties });
  //   });
  //   setFeatures(formatedFeatures);
  // };
  return (
    <div className="App">
      <Grid container>
      <Grid md={6}>
        <MaterialTable
          title="Parking locations"
          columns={[
            { title: "Street", field: "properties.street", defaultSort: false },
            { title: "Spots", field: "properties.spots", defaultSort: false },
            {
              title: "handicappedSpots",
              field: "properties.handicappedSpots",
              defaultSort: false,
            },
            {
              title: "Paid",
              field: "properties.paid",
              defaultSort: false,
            },
          ]}
          data={features}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setFeatures([...features, newData]);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...features];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setFeatures([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...features];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setFeatures([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        ></MaterialTable>
      </Grid>
      <Grid md={6}>
        <OLMapFragment />
      </Grid>
      </Grid>
    </div>
  );
}

export default App;
