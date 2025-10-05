// A placeholder for a more complex WebRTC adapter pattern.
// In a very large application, you might abstract different WebRTC providers (e.g., Twilio, Agora, PeerJS)
// behind a common interface. For this project, the useWebRTC hook is sufficient.

class WebRTCAdapter {
  constructor() {
    if (this.constructor === WebRTCAdapter) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  connect(roomId, localStream) {
    throw new Error("Method 'connect()' must be implemented.");
  }

  disconnect() {
    throw new Error("Method 'disconnect()' must be implemented.");
  }

  on(event, callback) {
    throw new Error("Method 'on()' must be implemented.");
  }
}

export class NativeWebRTCAdapter extends WebRTCAdapter {
    // This class would encapsulate the logic currently in the useWebRTC hook
    // to make it framework-agnostic and more easily testable.
}