window.onload = () => {
    //所有请求的url，都是通过baseurl进行拼接的
    const baseUrl = `http://1.15.88.222:3000`;

    //请求到轮播图的数据
    const getBannerData = async () => {
        // 1.从服务获取轮播图数据
        const bannerData = await axios.get(`${baseUrl}/banner`);
        console.log(bannerData);
        // 2.处理数据
        // 解构，从bannerData中获取状态和轮播图数据
        const {
            status,
            data: { banners },
        } = bannerData;
        // 判断，请求成功，我们走渲染逻辑
        if (status === 200) {
            // 处理数据，将轮播图数据，处理为图片的url数组
            const imgList = banners.map((banner) => {
                const { imageUrl } = banner;
                return imageUrl;
            });
            console.log(imgList);
            const swiperWrapper = document.querySelector(".swiper-wrapper");
            // 3.使用数据渲染页面
            imgList.forEach((img) => {
                // 创建一个div
                const swiperSlide = document.createElement("div");
                // 指定div的class为swiper-slide
                swiperSlide.className = "swiper-slide";
                // 1.可以添加一个img 2.替换背景图
                swiperSlide.style.background = `url(${img}) no-repeat`;
                swiperSlide.style.backgroundSize = "100% 100%";
                swiperWrapper.appendChild(swiperSlide);
            });
            var mySwiper = new Swiper('.swiper', {
                direction: 'horizontal', // 垂直切换选项
                loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // 如果需要滚动条
                // scrollbar: {
                //   el: '.swiper-scrollbar',
                // },
            });
        }
    };
    getBannerData();


    //渲染歌单列表
    const getPlayList = async () => {
        //1.从服务获取列表数据
        const playList = await axios.get('http://39.103.151.139:8000/music/playlist')
        console.log(playList);
        getSearchList(playList)
        const { status, data: { playlists } } = playList
        if (status === 200) {
            const renderData=playlists.map(play=>{
                const {name,coverImgUrl} =play
                return{
                    name,coverImgUrl
                }
            })
          
            console.log(renderData);
            const ullist=document.getElementById('playlist')
            renderData.forEach(data=>{
                const {coverImgUrl,name}=data
                const li=document.createElement('li')
                const img=document.createElement('img')
                const div=document.createElement('div')
                img.src=coverImgUrl
                div.innerHTML=name

                li.appendChild(img)
                li.appendChild(div)
                ullist.appendChild(li)

            })
        }
       
    };
    getPlayList();
    
    const Input=document.getElementById('input-text')
    const ulist=document.getElementById('music-name');
    
    
    const getSearchList=(data)=>{
        console.log(data);
       
        Input.onkeydown=((e)=>{
            if(e.code==='Enter'){
                console.log(e);
                console.log(e.target.value);
                const { status, data: { playlists } } = data
                if (status === 200) {
                    const searchData=playlists.map(play=>{
                        const {name,coverImgUrl} =play
                        return{
                            name,coverImgUrl
                        }
                    })
                    console.log(searchData);
                    // console.log(searchData[0]);
                    let SeaData=[]
                    SeaData=searchData.filter(item=>{
                        // console.log(item.name);
                        const {name,coverImgUrl} =item
                        if(name.indexOf(e.target.value)>=0){
                            // console.log(iname);
                            return{
                                name,coverImgUrl
                            }
                        }
                    })
                    // console.log(SeaData);
                    if(SeaData.length===0){
                        console.log('无搜索结果');
                    }
                   
                    if(ulist.children.length!=0){
                        
                    }
                    // console.log(ulist.children());
                    SeaData.forEach(data=>{
                        const {coverImgUrl,name}=data
                        const li=document.createElement('li')
                        li.innerHTML=name
                        ulist.appendChild(li)

                    })
                 }
            }
        })
    }
  
    const close=document.getElementById('close-img')
    const searchArea=document.getElementsByClassName('search-area')[0]
    const input=document.getElementById('input1')

    input.onclick=(e)=>{
        // console.log(e);
        searchArea.style.display='block';
        
    }

    close.onclick=()=>{
        searchArea.style.display='none';
    }

};