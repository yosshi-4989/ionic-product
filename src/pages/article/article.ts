import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'article/:id',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  post: {
    ID: number,
    title: string,
    content: string,
    date: string
  } = {
    ID: null,
    title: null,
    content: null,
    date: null
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public lodingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    let loading = this.lodingCtrl.create();
    loading.present();

    const id = this.navParams.get('id');
    this.http.get<{
      ID: number,
      title: string,
      content: string,
      date: string
    }>('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/'+id)
      .subscribe(data => {
        this.post = data;
        loading.dismiss();
      });
  }

}
