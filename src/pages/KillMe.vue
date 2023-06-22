<!-- 
    methods: {
        getData() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.restaurants)
                .then((response) => {
                    this.store.restaurants = response.data.results.restaurants
                    this.store.categories = response.data.results.categories
                    // let test=[]
                    // for (let i = 0; i < this.restaurants.length; i++) {
                    //     const category = this.restaurants[i].categories
                    //     for (let index = 0; index < category.length; index++) {
                    //         const categoryId = category[index].id
                    //         if (!test.includes(categoryId)) {
                    //             test.push(categoryId)
                    //             this.categories.push(category[index])
                    //         }
                    //     }
                    // }
                }
                )
        },
        search() {
            // if (this.searchBarText.trim() !== '') {
            //     return this.restaurants.filter(res => res.name.toLowerCase().includes(this.searchBarText.toLowerCase()))
            // } else if (this.selectedCategories.length > 0) {
            //     // return this.restaurants.filter((restaurant) => {
            //     //     console.log(restaurant.name)
            //     //     let control=[]
            //     //     let categoriesId=[]
            //     //     for (let index = 0; index < restaurant.categories.length; index++) {
            //     //         categoriesId.push(restaurant.categories[index].id)
            //     //     }
            //     //     for (let index = 0; index < this.selectedCategories.length; index++) {
            //     //         if(categoriesId.includes(this.selectedCategories[index])){
            //     //             control.push(1)
            //     //         } else {
            //     //             control.push(0)
            //     //         }
            //     //     }
            //     //     if(!control.includes(0)){
            //     //         return restaurant
            //     //     }         
            //     //}
            //     // )
            //     return this.restaurants.filter((res) => {
            //         if (this.selectedCategories.every((cat) => res.categories.map(categories => categories.id).includes(cat))) {
            //             return res
            //         }
            //     }
            //     )
            // } else {
            //     return this.restaurants
            // }
            if (this.store.searchBarText.trim() !== '' && this.store.selectedCategories.length > 0) {
                return this.store.restaurants.filter((res) => {
                    if (this.store.selectedCategories.every((cat) => res.categories.map(categories => categories.id).includes(cat))) {
                        return res
                    }
                }).filter(res => res.name.toLowerCase().includes(this.store.searchBarText.toLowerCase()))
            } else if (this.store.searchBarText.trim() !== '') {
                return this.store.restaurants.filter(res => res.name.toLowerCase().includes(this.store.searchBarText.toLowerCase()))
            } else if (this.store.selectedCategories.length > 0) {
                return this.store.restaurants.filter((res) => {
                    if (this.store.selectedCategories.every((cat) => res.categories.map(categories => categories.id).includes(cat))) {
                        return res
                    }})
            } else {
                return this.store.restaurants
            }
        },
        getIdRedirect(who){
            this.store.selectedRestaurant = who
            this.$router.push({name: 'menu', params:{slug: who.slug}})
        }
    }, -->
