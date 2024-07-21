import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrl: './hangman-display.component.scss'
})
export class HangmanDisplayComponent implements OnInit {
  
  @Input() guesses:string[]=[];
  @Input() question:string= "";
  MAX_MISTAKES=7;
  mistakesRemaining:number;

  constructor(){
    this.mistakesRemaining=this.MAX_MISTAKES;
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
