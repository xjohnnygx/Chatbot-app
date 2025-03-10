const chatBox = document.querySelector("#chat-box") as HTMLElement;
const chatForm = document.querySelector("#chat-form") as HTMLFormElement;
const inputField = document.querySelector("#input-field") as HTMLInputElement;

chatForm.addEventListener("submit", async function(event: SubmitEvent) {
    try {
        event.preventDefault();
        const message = inputField.value;
        chatBox.innerHTML += `<div class="user-message">${message}</div>`;
        const response = await fetch(`${window.location.origin}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        if (response.status === 200) {
            chatBox.innerHTML += `<div class="bot-message">${data.response}</div>`;
        } else {
            console.error(data);
            alert(data["error"]["code"]);
            alert(data["error"]["message"]);
        }
        inputField.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error(error);
    }
});