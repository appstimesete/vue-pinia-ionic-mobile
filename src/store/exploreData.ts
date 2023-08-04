import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
// import {useAuthStore} from "@/store/auth";
const {BASE_URL, GOOGLE_API_KEY} = appConst;
export const useExploreDataStore = defineStore({
    id: 'explore-data',
    state: () => ({
        dataLoaded:false,
        total_universities:0,
        total_countries:0,
        total_programs:0,
        universities:[],
        countries:[],
        programs:[],

        elite_dataLoaded:false,
        elite_datas:{},
        world_top_datas:[],
        region_top_datas:[],
        country_top_datas:[],
        verified_datas:[],
        links:[""],

        study_dest_datas:[],
        study_dest_dataLoaded:false,

        region_detail_data:[],
        region_detail_dataLoaded: false,

        country_detail_data:[],
        country_detail_dataLoaded: false,

        search_programs_data:[],
        search_institutes_data:[],
        search_dataLoaded:false,
        search_program_detail_datas:[],
        search_value:true,
        
        university_detail_dataLoaded: false,
        university_detail_datas:[],

        unipro_detail_dataLoaded: false,
        unipro_detail_datas:[],

        program_detail: {},

        search_keyword:"",
    }),
    actions: {
        async loadData(loadWithoutCheck = false) {
            await fetchWrapper.get(`${BASE_URL}/homepage`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.total_universities = data["total_universities"];
                    this.total_countries = data["total_countries"];
                    this.total_programs = data["total_programs"];
                    this.universities = data["universities"];
                    this.countries = data["countries"];
                    this.programs = data["programs"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();
        },

        async loadEliteData(loadWithoutCheck = false) {
            await fetchWrapper.get(`${BASE_URL}/universities/elite`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.links.pop();
                    this.links.push(data.links.next);
                    this.elite_datas = data;
                    // this.elite_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
            await fetchWrapper.get(`${BASE_URL}/universities/world-top`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.links.push(data.links.next);
                    this.world_top_datas = data;
                    // this.world_top_data_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
            await fetchWrapper.get(`${BASE_URL}/universities/region-top`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.links.push(data.links.next);
                    this.region_top_datas = data;
                    // this.world_top_data_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
            await fetchWrapper.get(`${BASE_URL}/universities/country-top`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.links.push(data.links.next);
                    this.country_top_datas = data;
                    // this.world_top_data_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
            await fetchWrapper.get(`${BASE_URL}/universities/verfied-top`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.links.push(data.links.next);
                    this.verified_datas = data;
                    this.elite_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();
        },

        async loadMore(id=0) {
            console.log(this.links[id])
            await fetchWrapper.get(this.links[id])
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    if(id == 0)
                        this.elite_datas=data;
                    if(id == 1)
                        this.world_top_datas=data;
                    if(id == 2)
                        this.region_top_datas=data;
                    if(id == 3)
                        this.country_top_datas=data;
                    if(id == 4)
                        this.verified_datas=data;
                    this.links[id] = data.links.next;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },

        async loadStudyDestDatas(loadWithoutCheck = false) {
            console.log("loading explore Data...");
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/regions`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.study_dest_datas = data["data"];
                    this.study_dest_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },

        async loadStudyDestDataDetail(id = 0) {
            console.log("loading region ID... ", id);
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/region-details/${id}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.region_detail_data = data["data"];
                    this.region_detail_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },
        async loadStudyDestCountry(id = 0) {
            console.log("loading region ID... ", id);
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/country-details/${id}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.country_detail_data = data;
                    this.country_detail_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },

        async loadSearchData(keyword="") {
            console.log("loading region ID... ", keyword);
            await fetchWrapper.get(`${BASE_URL}/search/${keyword}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.search_programs_data = data["programs"];
                    this.search_institutes_data = data["institutes"];
                    // console.log("search_value: ",this.search_programs_data)
                    // if(this.search_programs_data.length + this.search_institutes_data.length >0)
                    //     this.search_value = true;
                    // else
                    //     this.search_value = false;
                    this.search_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },

        changeLoadedVal() {
            this.elite_dataLoaded = false;
            this.country_detail_dataLoaded=false;
            this.region_detail_dataLoaded = false;
            this.study_dest_dataLoaded = false;
            this.search_dataLoaded = false;
            this.university_detail_dataLoaded = false;
            this.unipro_detail_dataLoaded = false;
            this.dataLoaded = false;
        },

        async changeSearchKeyword(val="") {
            this.search_keyword = val;
            await this.loadSearchData(val);
        },

        async loadProgramDetailSearch(keyword="") {
            await fetchWrapper.get(`${BASE_URL}/program-universities/${keyword}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    console.log("program-university", data);
                    this.search_program_detail_datas = data["data"];
                }).catch(()=>{
                    return;
                })
            return  Promise.resolve();   
        },

        async loadUniversityDetailSearch(id="") {
            await fetchWrapper.get(`${BASE_URL}/university-details/${id}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    console.log("program-university", data);
                    // this.search_programs_data = data["programs"];
                    // this.search_institutes_data = data["institutes"];
                    this.university_detail_dataLoaded = true;
                    this.university_detail_datas = data["data"];
                }).catch(()=>{
                    return;
                })
            return  Promise.resolve();   
        },

        async loadUniProDetailSearch(id="") {
            console.log("UnitProdetail:------------:", id)
            await fetchWrapper.get(`${BASE_URL}/university-programs/${id}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    console.log("UNIPROuniversity", data);
                    // this.search_programs_data = data["programs"];
                    // this.search_institutes_data = data["institutes"];
                    this.unipro_detail_dataLoaded = true;
                    this.unipro_detail_datas = data["data"];
                }).catch(()=>{
                    return;
                })
            return  Promise.resolve();   
        },
        
        async programDetails(id="") {
            await fetchWrapper.get(`${BASE_URL}/program-details/${id}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.program_detail = data["data"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();
        },
    }
});