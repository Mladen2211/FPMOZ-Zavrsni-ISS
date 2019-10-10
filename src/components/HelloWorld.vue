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
                    <swiper-slide  v-for="faks in fakulteti" :key="faks.id"><b-img :class="!isMobile() ? 'img' : 'imgsec'" @click="login(faks.username)" v-b-toggle.accordion-1 alt="logo" :src="faks.img"></b-img></swiper-slide>
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
    <b-container fluid>
      <b-row v-if="hasStudiji" class="filter">
        <b-col cols="4" class="first">
          <b-form-group>
              <p class="float-left">Odaberite studij:</p>
              <b-form-select v-on:change="getRokovi()" v-model='studijId'>
                <option v-for="studij in studiji" :value="studij.id" :key="studij.id">{{studij.naziv}}</option>
              </b-form-select>                  
            </b-form-group>
           <b-form-group>
              <p class="float-left">Odaberite semestar:</p>
              <b-form-select v-on:change="filterData()"  v-model='odabraniSemestar'>
                <option v-for="opcija in opcije" :value="opcija.value" :key="opcija.value">{{opcija.text}}</option>
              </b-form-select>                  
            </b-form-group>
            <b-form-group>
              <p class="float-left">Odaberite rok:</p>
              <b-form-select v-on:change="filterData()"  v-model='odabraniRok'>
                <option v-for="rok in rokovi" :value="rok" :key="rok">{{rok}}</option>
              </b-form-select>                  
            </b-form-group>
            <b-form-group>
              <p class="float-left">Odaberite predmet:</p>  
              <b-form-select v-on:change="filterData()"  v-model='predmet'>
                <option v-for="predmet in predmeti" :value="predmet" :key="predmet">{{predmet}}</option>
              </b-form-select>
            </b-form-group>
        </b-col>
        <b-col cols="8" v-if="hasRokovi">

          <b-table 
            id="my-table"
            striped 
            hover 
            :items="ispiti" 
            :fields="fields"
            :per-page="perPage"
            align="center"
            :current-page="currentPage"
            small
            :key="ispiti.id"
          ></b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="perPage"
            align="center"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
/*eslint-disable*/
  export default {
    data() {
      return {
        user: {
          username:'',
          password: 'issapi'
        },
        perPage: 10,
        currentPage: 1,
        totalItems: 0,
        authToken: '',
        fakultetId: '',
        predmet:'',
        odabraniRok:'',
        odabraniSemestar:'',
        hasStudiji: false,
        hasRokovi:false,
        ispiti:[],
        studiji:[],
        predmeti: [],
        tempArr:[],
        fields: [
          {
            key: 'ptiId.naziv',
            label: 'Naziv',
            sortable: true
          },
          {
            key: 'datumRoka',
            sortable: false
          },
          {
            key: 'nositeljId.ime',
            label: 'Ime',
            sortable: false,

          },
          {
            key: 'nositeljId.prezime',
            label: 'Prezime',
            sortable: false,
          },
           {
            key: 'vrstaRoka',
            sortable: false
          },
          {
            key: 'semestar',
            sortable: false
          },
        ],
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
        studijiTemp:'',
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
    computed: {
      rows(){
        this.totalItems = parseInt(this.studiji.length);
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
        this.predmeti = [];
        this.$axios.get(`https://is.sum.ba:4443/ISSApi/resources/fakulteti/${this.fakultetId}/studiji/${this.studijId}/kolegiji//rokovi?akademskaGodina=2018/2019&order=ptiId.naziv&webPrikaz=D`,{
          headers: {
            'issApiAccessToken': this.authToken
          }
        })
        .then(res=>{
          this.ispiti = res.data
          this.hasRokovi=true;
          this.studijiTemp = this.ispiti;
          console.log(this.ispiti)
          this.filterOut();
        })
      },
      filterOut(){
        for (let x in this.ispiti){
          if(this.predmeti.indexOf(this.ispiti[x].ptiId.naziv)==-1){
            this.predmeti.push(this.ispiti[x].ptiId.naziv)
          }
        }
         console.log(this.predmeti)
         this.totalItems = parseInt(this.ispiti.length);
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
    filterData(){
      this.ispiti=this.studijiTemp
      if(this.predmet !='' && this.odabraniRok !='' && this.odabraniSemestar !=''){
        for (let x in this.ispiti){
          if(this.ispiti[x].ptiId.naziv === this.predmet && this.ispiti[x].vrstaRoka === this.odabraniRok && this.ispiti[x].semestar == this.odabraniSemestar){
            this.tempArr.push(this.ispiti[x])
          }
        }
      }else if(this.predmet !='' && this.odabraniRok !=''){
        for (let x in this.ispiti){
          if(this.ispiti[x].ptiId.naziv === this.predmet && this.ispiti[x].vrstaRoka === this.odabraniRok ){
            this.tempArr.push(this.ispiti[x])
          }
        }
      }else if (this.odabraniRok !='' && this.odabraniSemestar !=''){
        for (let x in this.ispiti){
          if(this.ispiti[x].vrstaRoka === this.odabraniRok && this.ispiti[x].semestar == this.odabraniSemestar){
            this.tempArr.push(this.ispiti[x])
          }
        }
      }else if (this.predmet !='' && this.odabraniSemestar !=''){
        for (let x in this.ispiti){
          if(this.ispiti[x].ptiId.naziv === this.predmet && this.ispiti[x].semestar == this.odabraniSemestar){
            this.tempArr.push(this.ispiti[x])
          }
        }        
      } else{
        if(this.predmet !=''){
        for (let x in this.ispiti){
          if(this.ispiti[x].ptiId.naziv === this.predmet){
            this.tempArr.push(this.ispiti[x])
          }
        }        
      }
      else if(this.odabraniRok !=''){
        for (let x in this.ispiti){
          if(this.ispiti[x].vrstaRoka === this.odabraniRok){
            this.tempArr.push(this.ispiti[x])
          }
        }
      }
      else if(this.odabraniSemestar !=''){
        console.log(this.odabraniSemestar)
        for (let x in this.ispiti){
          if(this.ispiti[x].semestar == this.odabraniSemestar){
            this.tempArr.push(this.ispiti[x])
          }
        }
        
      }
      }
      this.ispiti = this.tempArr;
        this.totalItems = parseInt(this.ispiti.length);
        this.tempArr = []
        this.totalItems = parseInt(this.ispiti.length);
    }
      
  }
}
/*eslint-disable*/
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
  height: 200px;
  width: 200px;
}
.imgsec{
  height: 100px;
  width: 100px;
}
.filter{
  margin-top: 8%;
}
.first{
  border-right: lightslategray 1px solid
}
</style>
