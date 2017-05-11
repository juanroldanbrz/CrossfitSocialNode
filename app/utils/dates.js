module.exports = {
    getDateDiffInYears: function (date1) {
        //EN FORMATO YYYY-MM-DD
        cDate= new Date();
        year = cDate.getFullYear();
        month = cDate.getMonth();
        day = cDate.getDay();
        date2 = year+'-'+month+'-'+day;
        var dateParts1 = date1.split('-')
            , dateParts2 = date2.split('-')
            , d1 = new Date(dateParts1[0], dateParts1[1]-1, dateParts1[2])
            , d2 = new Date(dateParts2[0], dateParts2[1]-1, dateParts2[2])

        return new Date(d2 - d1).getYear() - new Date(0).getYear() + 1;
    }
};


