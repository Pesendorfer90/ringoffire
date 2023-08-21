import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  game: any;

  constructor(private firestore: Firestore, private router: Router) { }

  newGame() {
    let game = new Game
    const itemCollection = collection(this.firestore, 'games');
    addDoc(itemCollection, game.toJson())
    .then((gameInfo: any) => {
       this.router.navigateByUrl('/game/' + gameInfo.id)
    })
  }

}
