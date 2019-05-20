
cart=[{"title":"Snowboard Rubber Duck","imageUrl":"https://amsterdamduckstore.com/wp-content/uploads/2018/01/Sneowboard-rubber-duck-Amsterdam-Duck-Store.jpg","price":"8.95 €","link":"https://amsterdamduckstore.com/rubber-duck/snowboard-rubber-duck/","description":"Snowboard Rubber Duck. Buy the boarding champ of the Amsterdam Duck Store. Wearing snowboard goggles, black helmet, snowsuit, red gloves and carrying a silver snowboard. Ready to shred the fresh pow.Worldwide delivery ∗ Hand painted details ∗ Premium quality ∗ Collectors rubber duckApproved by Communauté Européenne CE","id":"5c3853aebd1bde8520e66e16"},
{"title":"Snowboard Rubber Duck","imageUrl":"https://amsterdamduckstore.com/wp-content/uploads/2018/01/Sneowboard-rubber-duck-Amsterdam-Duck-Store.jpg","price":"8.95 €","link":"https://amsterdamduckstore.com/rubber-duck/snowboard-rubber-duck/","description":"Snowboard Rubber Duck. Buy the boarding champ of the Amsterdam Duck Store. Wearing snowboard goggles, black helmet, snowsuit, red gloves and carrying a silver snowboard. Ready to shred the fresh pow.Worldwide delivery ∗ Hand painted details ∗ Premium quality ∗ Collectors rubber duckApproved by Communauté Européenne CE","id":"5c3853aebd1bde8520e66e16"},
{"title":"Snowboard Rubber Duck","imageUrl":"https://amsterdamduckstore.com/wp-content/uploads/2018/01/Sneowboard-rubber-duck-Amsterdam-Duck-Store.jpg","price":"8.95 €","link":"https://amsterdamduckstore.com/rubber-duck/snowboard-rubber-duck/","description":"Snowboard Rubber Duck. Buy the boarding champ of the Amsterdam Duck Store. Wearing snowboard goggles, black helmet, snowsuit, red gloves and carrying a silver snowboard. Ready to shred the fresh pow.Worldwide delivery ∗ Hand painted details ∗ Premium quality ∗ Collectors rubber duckApproved by Communauté Européenne CE","id":"5c3853aebd1bde8520e66e16"},
{"title":"Football Player Rubber Duck","imageUrl":"https://amsterdamduckstore.com/wp-content/uploads/2018/11/Football-Player-Rubber-Duck-front-Amsterdam-Duck-Store-400x400.jpg","price":"8.95 €","link":"https://amsterdamduckstore.com/rubber-duck/football-player-rubber-duck/","description":"Football Player Rubber Duck. Buy the American football quarterback duck of the Amsterdam Duck Store. Wearing red helmet, football jersey number 58 and carrying a football. Ready to make a touchdown.Worldwide delivery ∗ Hand painted details ∗ Premium quality ∗ Collectors rubber duckApproved by Communauté Européenne CE","id":"5c3853aebd1bde8520e66e28"}
]
let priceAcc
const filteredDuck = cart.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      let res = current.price.slice(0, 4)
      priceAcc+= Number(res)
      console.log(priceAcc)
      let price = priceAcc.toString()+' €'
      console.log(price)
      current[price]=price
      return acc;
    }
  }, []);
  console.log(filteredDuck)
