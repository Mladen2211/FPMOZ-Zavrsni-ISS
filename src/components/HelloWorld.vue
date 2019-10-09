<template>
  <b-container class="fluid" fluid>
    <b-container fluid>
      <b-row>
      <b-col cols="12">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="primary">Odaberite Fakultet</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
                  <swiper :options="swiperOption">
                    
                    <swiper-slide  v-for="faks in fakulteti"><b-img :class="!isMobile() ? 'img' : 'imgsec'" @click="login(faks.username)" v-b-toggle.accordion-1 alt="logo" :src="faks.img"></b-img></swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                    <div class="swiper-pagination" slot="pagination"></div>
                  </swiper>  
          </b-card-body>
        </b-collapse>
      </b-card>
      </b-col>
    </b-row>
    </b-container>
    <b-container>
      <b-row v-if="hasStudiji">
        <b-col cols="12">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" variant="info" v-b-toggle.accordion>
              Filter
            </b-card-header>
            <b-collapse id="accordion" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                
            <b-form-group>
              <p class="float-left">Odaberite studij:</p>
              <b-form-select v-on:change="getRokovi()" v-model='studijId'>
                <option v-for="studij in studiji" :value="studij.id">{{studij.naziv}}</option>
              </b-form-select>                  
            </b-form-group>
            <b-form-group>
              <b-form-radio-group
                class="float-left"
                v-model="odabraniSemestri"
                :options="opcije"
                id="radio-slots"
                name="radio-options-slots"               
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group>
              <p class="float-left">Odaberite rok:</p>
              <b-form-select  v-model='odabraniRok'>
                <option v-for="rok in rokovi" :value="rok">{{rok}}</option>
              </b-form-select>                  
            </b-form-group>
            <b-form-group>
              <p class="float-left">Odaberite studij:</p>  
              <b-form-select  v-model='predmetId'>
                <option v-for="predmet in predmeti" :value="predmet.id">{{studij.ptiId.naziv}}</option>
              </b-form-select> 
            </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
src="../assets/logo.png"
<script>
  export default {
    data() {
      return {
        user: {
          username:'',
          password: 'issapi'
        },
        authToken: '',
        fakultetId: '',
        predmetId:'',
        hasStudiji: false,
        studiji: [],
        predmeti: [],
        odabraniSemestri: [],
        opcije: [
          {text: '1',value: '1'},
          {text: '2',value: '2'},
          {text: '3',value: '3'},
          {text: '4',value: '4'},
          {text: '5',value: '5'},
          {text: '6',value: '6'}
        ],
        rokovi: ['Ljetni ispitni rok', 'Proljetni ispitni rok', 'Zimski ispitni rok', 'Jesenjski isptitni rok', 'Dekanski ispitni rok'],
        studijId: '',
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 2,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        fakulteti: [
          {id:1, naziv:"", username:"APTF_ISSAPI", img: require('../assets/APTF.png')},
          {id:2, naziv:"", username:"ALU_ISSAPI", img: require('../assets/ALU.png')},
          {id:3, naziv:"", username:"EF_ISSAPI", img:require('../assets/EF.png')},
          {id:4, naziv:"", username:"FPMOZ_ISSAPI", img:require('../assets/FPMOZ.png')},
          {id:5, naziv:"", username:"FSR_ISSAPI", img:require('../assets/FSR.png')},
          {id:6, naziv:"", username:"FZS_ISSAPI", img:require('../assets/FZS.png')},
          {id:7, naziv:"", username:"FARFMO_ISSAPI", img:require('../assets/FARM.png')},
          {id:8, naziv:"", username:"FFMO_ISSAPI", img:require('../assets/FF.png')},
          {id:9, naziv:"", username:"GF_ISSAPI", img:require('../assets/GF.png')},
          {id:10, naziv:"", username:"MF_ISSAPI", img:require('../assets/MEF.png')},
          {id:11, naziv:"", username:"PF_ISSAPI", img:require('../assets/PF.png')}
        ]

      }
    },
    methods: {
      login(value){
        this.$axios.post('https://is.sum.ba:4443/ISSApi/resources/login',
              {
                username: value,
                password: 'issapi'
              }
        ).then(response => {
         this.authToken = response.data.issApiAccessToken;
        localStorage.setItem('id_token', 'Bearer ' + response.data.issApiAccessToken);
        this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('id_token');
        this.set();
        })
      },
       isMobile(){
        let width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(width <1300 ) {
          return true;
        }
        else return false;
      },
      set(){
        this.$axios.get('https://is.sum.ba:4443/ISSApi/resources/fakulteti',{
          headers: {
            'issApiAccessToken': this.authToken
          }
        }). then(res=> {
          this.fakultetId =res.data[0].id;
          this.getStudij() 
      })
      },
      getRokovi(){
        console.log(this.studijId)
        this.$axios.get(`https://is.sum.ba:4443/ISSApi/resources/fakulteti/${this.fakultetId}/studiji/${this.studijId}/kolegiji//rokovi?akademskaGodina=2018/2019&order=ptiId.naziv&webPrikaz=D`,{
          headers: {
            'issApiAccessToken': this.authToken
          }
        })
        .then(res=>{
          this.predemti = res.data
          console.log(this.predemti)
        })
      },
       getStudij(){
        this.$axios.get(`https://is.sum.ba:4443/ISSApi/resources/fakulteti/${this.fakultetId}/studiji?order=naziv&webPrikaz=D`,{
          headers: {
            'issApiAccessToken': this.authToken
          }
        })
        .then(res=>{
          this.studiji= res.data;
          this.hasStudiji=true;
          console.log(this.studiji);
        })
    },  
  }
}
</script>
<style >
.p-1{
  margin-top:0;
}
.fluid{
  margin:-10;
}
.img{
  min-width: 50px;
}
.imgsec{
  height: 100px;
  width: 100px;
}
</style>
