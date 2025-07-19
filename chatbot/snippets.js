 function getChat(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_NGROK_URL}/chat/687543b3cd436d710474942a`,
      // url: "jsonplaceholder.typicode.com/todos/1"
    })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(
    `${import.meta.env.VITE_NGROK_URL}/chat/687543b3cd436d710474942a`
  );