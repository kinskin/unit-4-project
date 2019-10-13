module.exports = (db)=>{



    let data = (request,response)=>{
        let lingData = {
            data:{
                prices:[{
                    buy:903072,
                    sell:882068,
                    id:5572536,
                    pair:"BTCSGD",
                    timestamp:"2018-08-08T13:45:47"
                },
                {
                    buy:6729,
                    sell:6455,
                    id:5572564,
                    pair:"LTCUSD",
                    timestamp:"2018-08-08T13:47:06.806"
                },
                {
                    buy:51917,
                    sell:49938,
                    id:5572570,
                    pair:"ETHSGD",
                    timestamp:"2018-08-08T13:47:08.429"
                },
                {
                    buy:86939,
                    sell:83519,
                    id:5572567,
                    pair:"BCHSGD",
                    timestamp:"2018-08-08T13:47:07.356"
                },
                {
                    buy:9173,
                    sell:8815,
                    id:5572565,
                    pair:"LTCSGD",
                    timestamp:"2018-08-08T13:47:06.811"
                },
                {
                    buy:666146,
                    sell:63977,
                    id:557257,
                    pair:"BTCUSD",
                    timestamp:"2018-08-08T13:47:08.994"
                },
                {
                    buy:63904,
                    sell:61212,
                    id:5572566,
                    pair:"BCHUSD",
                    timestamp:"2018-08-08T13:47:07.352"
                },
                {
                    buy:38024,
                    sell:36687,
                    id:5572569,
                    pair:"ETHUSD",
                    timestamp:"2018-08-08T13:47:08.424"
                }]
            }
        }
        response.send(lingData)
    }

    return{
        data:data
    }
}