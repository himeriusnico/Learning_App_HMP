import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
  }

  ionViewDidEnter(){
    // this.rotateAvatar();
    // this.shrinkGrowAvatar();
  }

  fadeInAvatar() {
    const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
    const animation = this.animationCtrl
        .create()
        .addElement(avatarElement)
        .duration(5000) // Animation duration in milliseconds
        .iterations(3) // do animation 3 times
        .keyframes([
            { offset: 0, opacity: '0' }, // Start with full opacity
            { offset: 0.2, opacity: '0.2' },
            { offset: 0.4, opacity: '0.4' },
            { offset: 0.6, opacity: '0.6' },
            { offset: 0.8, opacity: '0.8' },
            { offset: 1, opacity: '1' },
        ]);
    animation.play();
}

rotateAvatar() {
  const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
   const animation = this.animationCtrl
       .create()
       .addElement(avatarElement)
       .duration(5000) // Animation duration in milliseconds
       .iterations(3) // do animation 3 times
       .keyframes([
           { offset: 0, transform: 'rotate(0deg)' }, // Start with no rotation
           { offset: 1, transform: 'rotate(360deg)' }, // Rotate 360 degrees (full circle)
       ]);
   animation.play();
}

shrinkGrowAvatar(){
  const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
    const animation = this.animationCtrl
    .create()
    .addElement(avatarElement)
    .duration(5000)
    .iterations(3)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },   
      { offset: 0.5, transform: 'scale(1.2)' }, 
      { offset: 1, transform: 'scale(1)' }
    ]);
    animation.play();
}

}
