module.exports = [
    {
        name: '基隆市',
        hospitals: [
            require('./hospitals/keelung'),
        ]
    },

    {
        name: '台北市',
        hospitals: [
            require('./hospitals/ntuh'),
            require('./hospitals/vghtpe'),
            require('./hospitals/skh'),
            require('./hospitals/wanfang'),
        ]
    },

    {
        name: '新北市',
        hospitals: [
            require('./hospitals/femh'),
        ]
    },

    {
        name: '桃園市',
        hospitals: [
            require('./hospitals/yeezen'),
            require('./hospitals/landseed'),
            require('./hospitals/cgmh'),
        ]
    },

    {
        name: '台中市',
        hospitals: [
            require('./hospitals/cmuh'),
            require('./hospitals/csh'),
        ]
    },

    {
        name: '彰化市',
        hospitals: [
            require('./hospitals/cch'),
        ]
    },

    {
        name: '台南市',
        hospitals: [
            require('./hospitals/chimei'),
            require('./hospitals/vhyk'),
        ]
    },

    {
        name: '高雄市',
        hospitals: [
            require('./hospitals/kmuh'),
        ]
    },

    {
        name: '花蓮縣',
        hospitals: [
            require('./hospitals/tzuchi'),
        ]
    }
]
