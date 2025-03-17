const chatBox = document.querySelector("#chat-box") as HTMLElement;
const chatForm = document.querySelector("#chat-form") as HTMLFormElement;
const inputField = document.querySelector("#input-field") as HTMLInputElement;

const colors = ["#007bff", "#dc3545", "#00f038", "#9f0eff", "#eeff00"];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

chatForm.addEventListener("submit", async function(event) {
    try {
        event.preventDefault();
        const message = inputField.value;
        const userColor = getRandomColor();
        chatBox.innerHTML += `<div class="message user-message" style="background-color: ${userColor};
        color: ${userColor == "#00f038" || userColor === "#eeff00" ? "black" : "white"};">${message}</div>`;
        
        const response = await fetch(`${window.location.origin}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        
        if (response.status === 200) {
            const botColor = getRandomColor();
            chatBox.innerHTML += `<div class="message bot-message" style="background-color: ${botColor};
            color: ${botColor == "#00f038" || botColor === "#eeff00" ? "black" : "white"};">${data.response}</div>`;
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