class ConversationSocket {
    constructor(conversationId) {
        this.conversationId = conversationId;
        this.socket = null;

        this.onMessage = null;
        this.onOpen = null;
        this.onClose = null;
        this.onError = null;
    }

    connect() {
        const protocol =
            window.location.protocol === "https:"
                ? "wss"
                : "ws";

        const host = "127.0.0.1:8000";

        const url =
            `${protocol}://${host}` +
            `/ws/conversations/${this.conversationId}/`;

        this.socket = new WebSocket(url);

        this.socket.onopen = (event) => {
            console.log(
                "WebSocket connected"
            );

            if (this.onOpen) {
                this.onOpen(event);
            }
        };

        this.socket.onmessage = (event) => {
            try {
                const data =
                    JSON.parse(event.data);

                if (this.onMessage) {
                    this.onMessage(data);
                }
            } catch (error) {
                console.error(
                    "Invalid WebSocket message:",
                    error
                );
            }
        };

        this.socket.onclose = (event) => {
            console.log(
                "WebSocket disconnected"
            );

            if (this.onClose) {
                this.onClose(event);
            }
        };

        this.socket.onerror = (error) => {
            console.error(
                "WebSocket error:",
                error
            );

            if (this.onError) {
                this.onError(error);
            }
        };
    }

    sendMessage(message) {
        if (
            !this.socket ||
            this.socket.readyState !== WebSocket.OPEN
        ) {
            console.error(
                "WebSocket is not connected"
            );

            return;
        }

        this.socket.send(
            JSON.stringify({
                message,
            })
        );
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

export default ConversationSocket;