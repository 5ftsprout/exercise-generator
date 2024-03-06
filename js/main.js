
function generateCategoryList(){
    let url = 'https://wger.de/api/v2/exercisecategory'
    fetch(url)
        .then(res => res.json())
        .then(data => {
            catList = document.getElementById('category_list')
            data.results.forEach(i => {
                createLi = document.createElement('li')
                let exerciseId = i.id
                catList.appendChild(createLi).setAttribute('id', exerciseId)
                document.getElementById(`${exerciseId}`).innerText = i.name
                document.getElementById(`${exerciseId}`).addEventListener('click', generateExercise)
            })
        })
        .catch(err => {
            console.log(`Error $[err]`)
        })

}

function generateExercise(){
    let url = 'https://wger.de/api/v2/exercise'
    catId = this.getAttribute('id')
    fetchExercise()
    function fetchExercise() {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            numOfExercises = data.count
            randomPageNum = Math.floor(Math.random() * (numOfExercises))
            console.log(randomPageNum)
            fetch(`${url}/?limit=50&offset=${randomPageNum}`)
                .then(res => res.json())
                .then(data => {
                    for (i=0; i < 50; i++)
                        if (data.results[i].category == catId && data.results[i].language == '2') {
                            console.log(data.results[i])
                            exerciseData = data.results[i]
                            document.getElementById('exercise_name').innerText = exerciseData.name
                            document.getElementById('exercise_desc').innerText = exerciseData.description
                            document.getElementById('exercise_img').style.width = `20em`
                            document.getElementById('exercise_img').style.height = `20em`
                            //document.getElementById('exercise_img').setAttribute('src', )
                            document.getElementById('exercise_img').setAttribute('alt', 'Image demonstrating the workout.')
                            return
                        }
                        else {
                            console.log('Next')
                            i++
                        }
                        console.log(`No match`)
                        fetchExercise()
                })
                .catch(err => {
                    console.log(`Error ${err}`)
                })
        })
        .catch(err => {
            console.log(`Error ${err}`)
        })    
    }

}

generateCategoryList()