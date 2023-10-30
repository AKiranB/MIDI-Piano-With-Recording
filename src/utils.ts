type Note = {
  note: string;
  time: number;
};

type Node = {
  note: Note;
  next: Node | null;
};

export interface LinkedList {
  append(note: Note): void;
  printList(): void;
}

export class NotesList implements LinkedList {
  private head: Node | null = null;
  private tail: Node | null = null;
  private count = 0;

  append(note: Note) {
    console.log(note);
    const node: Node = { note, next: null };
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.count++;
  }

  printList() {
    let node = this.head;
    for (let i = 0; i < this.count; i++) {
      console.log(node?.note);
      node = node?.next as Node;
    }
  }
}
