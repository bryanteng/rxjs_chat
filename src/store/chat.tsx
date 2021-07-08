import { Subject } from 'rxjs'

const subject = new Subject();

type Person = 'first-person' | 'second-person' | { custom: string }

interface ChatMessage {
  id: number;
  text: string;
  person: Person | string;
}

type InitialState = {
  data : ChatMessage[] | []
  newDataCount: number
}

const initialState: InitialState = {
  data: [],
  newDataCount: 0,
};
let state = initialState;

const chatStore = {
  init: () => {
    state = {...state, newDataCount: 0}
    subject.next(state)
  },
  subscribe: setState => subject.subscribe(setState),
  sendMessage: (message: ChatMessage) => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1
    };
    subject.next(state);
  },
  clearChat: () => {
    state = {...state, data: []};
    subject.next(state);
  },
  initialState
};

export default chatStore
