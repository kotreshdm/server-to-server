const applications = {
    "app1": {
      secret: "secret123",    
      allowedEndpoints: [
        "/api/app1/data1",
        "/data2"
      ]
    },
    "app2": {
      secret: "secret234",
      allowedEndpoints: [
        "/data1"
      ]
    },
    "app3": {
      secret: "secret345",
      allowedEndpoints: [
        "/data3"
      ]
    },
    "app4": {
      secret: "secret456",
      allowedEndpoints: [
        "/data3",
        "/data4"
      ]
    }
  };

  export default applications