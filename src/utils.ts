type NoteData = {
  note: string;
  time: number;
};

type Node = {
  noteData: NoteData;
  next: Node | null;
};

export interface LinkedList {
  append(note: NoteData): void;
  printList(): void;
  clear(): void;
  isEmpty(): boolean;
}

export class NotesList implements LinkedList {
  public head: Node | null = null;
  private tail: Node | null = null;
  private count = 0;

  append(noteData: NoteData) {
    const node: Node = { noteData, next: null };
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.count++;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  printList() {
    let node = this.head;
    for (let i = 0; i < this.count; i++) {
      console.log(node?.noteData);
      node = node?.next as Node;
    }
  }

  isEmpty() {
    if (this.count === 0) {
      return true;
    }
    return false;
  }
}
