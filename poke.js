const container = document.querySelector('.pokedex');
const pageOneUrl = "https://pokeapi.co/api/v2/pokemon";

const getPokemonDetails = (url, listUrl) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    document.getElementById('prev').onclick = () => {
        return false;
    }

    document.getElementById('next').onclick = () => {
        return false;
    }

    axios.get(url)
        .then((response) => {
            const data = response.data;

            const nameDiv = document.createElement('div');

            nameDiv.appendChild(
                document.createTextNode(data.species.name)
            );
            nameDiv.className = 'pokeName';
            container.appendChild(nameDiv);

            const img = document.createElement('img');

            img.src = data.sprites.front_default;
            img.className = 'pokePic';
            container.appendChild(img);

            const statsDiv = document.createElement('div');

            statsDiv.className = 'stats';
            statsDiv.appendChild(
                document.createTextNode("Height: " + data.height + " || Weight: " + data.weight)
            );
            container.appendChild(statsDiv);

            const button = document.createElement('div');

            button.className = 'back';
            button.appendChild(
                document.createTextNode("Back")
            );
            button.onclick = () => { getPokemonList(listUrl) };
            container.appendChild(button);
        })
        .catch((error) => {
            throw error;
        });
}

const getPokemonList = (url) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    axios.get(url)
        .then((response) => {
            const data = response.data.results;
            const prev = response.data.previous;
            const next = response.data.next;

            data.map((pokemon) => {
                const div = document.createElement('div');
                const text = document.createTextNode(pokemon.name);

                div.appendChild(text);
                div.className += 'pokeList';
                div.onclick = () => { getPokemonDetails(pokemon.url, url); };
                container.appendChild(div);
            });

            if (prev) {
                document.getElementById('prev').onclick = () => {
                    getPokemonList(prev);
                }
            }

            if (next) {
                document.getElementById('next').onclick = () => {
                    getPokemonList(next);
                }
            }
        })
        .catch((error) => {
            throw error;
        });
}

getPokemonList(pageOneUrl);