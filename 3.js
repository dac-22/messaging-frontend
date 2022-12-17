window.addEventListener("load", () => {
  loadMessages();
});

async function addMessageToServer() {
  let textRef = document.querySelector("#textId1");

  let url = `http://localhost:3000/message`;
  let data = {
    message: textRef.value,
    reply: 0,
  };

  await axios.post(url, data);
  textRef.value = "";

  // reload the messages
  loadMessages();
}

function handleEnterCode(event) {
  if (event.keyCode == 13) {
    addMessageToServer();
  }
}

async function loadMessages() {
  let url = `http://localhost:3000/messages`;
  let response = await axios.get(url);

  let parent = document.querySelector("#parent");
  for (let item of response.data) {
    let messageTimeStr = item.messageTime;
    let messageTime = new Date(messageTimeStr);
    let hour = messageTime.getHours();
    let minute = messageTime.getMinutes();

    let newElement = `<div class="d-flex justify-content-between align-items-center my-1">
                        <div class="badge text-bg-secondary fs-6">
                          ${item.message}
                          <span class="ms-4" style="font-size: 10px">${hour}:${minute} pm</span>
                        </div>
                      </div>`;
    parent.innerHTML = newElement + parent.innerHTML;
  }
  console.log(response);
}
