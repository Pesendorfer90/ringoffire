import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, setDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: any;
  gameOver = false;

  games$: Observable<any>;
  currentGame: Array<any>;


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.gameId = params;
      this.firestoreDatabase();
    })
  }


  firestoreDatabase() {
    const itemCollection = doc(this.firestore, 'games', this.gameId.id);
    this.games$ = docData(itemCollection);
    this.games$.subscribe((game: any) => {
      console.log('Game update:', game);
      // this.currentGame = game;
      this.game.currentPlayer = game.currentPlayer;
      this.game.player_images = game.player_images,
        this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.stack = game.stack;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
    })
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard)
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  editPlayer(playerID: number) {
    console.log('edit player', playerID);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.player_images.splice(playerID, 1)
          this.game.players.splice(playerID, 1)
        } else {
          console.log('recived change', change)
          this.game.player_images[playerID] = change;
        }
      this.saveGame();
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('icon-1.png');
        this.saveGame();
      }
    });
  }


  saveGame() {
    const itemCollection = doc(this.firestore, 'games', this.gameId.id);
    this.games$ = docData(itemCollection);
    setDoc(itemCollection, this.game.toJson())
  }
}
