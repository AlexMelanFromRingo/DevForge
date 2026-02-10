import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoremService {
  private readonly words: string[] = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
    'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
    'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam',
    'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
    'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure',
    'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat',
    'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
    'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit',
    'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos', 'accusamus',
    'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis', 'praesentium',
    'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
    'quas', 'molestias', 'excepturi', 'obcaecati', 'cupiditate', 'provident',
    'similique', 'mollitia', 'animi', 'perspiciatis', 'unde', 'omnis',
    'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae',
    'ab', 'illo', 'inventore', 'veritatis', 'quasi', 'architecto', 'beatae',
    'vitae', 'dicta', 'explicabo',
  ];

  private readonly loremStart = 'Lorem ipsum dolor sit amet';

  /**
   * Generates placeholder Lorem Ipsum text.
   *
   * @param count   Number of units to generate.
   * @param unit    The unit type: 'words', 'sentences', or 'paragraphs'.
   * @param startWithLorem  If true the output begins with "Lorem ipsum dolor sit amet".
   * @returns The generated lorem ipsum text.
   */
  generate(
    count: number,
    unit: 'paragraphs' | 'sentences' | 'words',
    startWithLorem: boolean = true
  ): string {
    const safeCount = Math.max(1, Math.round(count));

    switch (unit) {
      case 'words':
        return this.generateWords(safeCount, startWithLorem);
      case 'sentences':
        return this.generateSentences(safeCount, startWithLorem);
      case 'paragraphs':
        return this.generateParagraphs(safeCount, startWithLorem);
    }
  }

  private randomWord(): string {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  private generateWords(count: number, startWithLorem: boolean): string {
    if (startWithLorem) {
      const loremWords = this.loremStart.toLowerCase().split(' ');
      if (count <= loremWords.length) {
        return loremWords.slice(0, count).join(' ');
      }
      const remaining = count - loremWords.length;
      const extra = Array.from({ length: remaining }, () => this.randomWord());
      return [...loremWords, ...extra].join(' ');
    }

    return Array.from({ length: count }, () => this.randomWord()).join(' ');
  }

  private generateSentence(startWithLorem: boolean): string {
    const length = Math.floor(Math.random() * 8) + 6; // 6-13 words
    let wordsArr: string[];

    if (startWithLorem) {
      const loremWords = this.loremStart.toLowerCase().split(' ');
      if (length <= loremWords.length) {
        wordsArr = loremWords.slice(0, length);
      } else {
        const extra = Array.from({ length: length - loremWords.length }, () =>
          this.randomWord()
        );
        wordsArr = [...loremWords, ...extra];
      }
    } else {
      wordsArr = Array.from({ length }, () => this.randomWord());
    }

    // Capitalize first word
    wordsArr[0] = wordsArr[0].charAt(0).toUpperCase() + wordsArr[0].slice(1);

    return wordsArr.join(' ') + '.';
  }

  private generateSentences(count: number, startWithLorem: boolean): string {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      sentences.push(this.generateSentence(startWithLorem && i === 0));
    }
    return sentences.join(' ');
  }

  private generateParagraph(startWithLorem: boolean): string {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
    return this.generateSentences(sentenceCount, startWithLorem);
  }

  private generateParagraphs(count: number, startWithLorem: boolean): string {
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      paragraphs.push(this.generateParagraph(startWithLorem && i === 0));
    }
    return paragraphs.join('\n\n');
  }
}
