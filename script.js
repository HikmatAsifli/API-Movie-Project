function searchMovie() {
  const apiKey = "27898455";
  const searchQuery = document.getElementById("searchInput").value.trim();
  const apiUrl = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("The network search was incorrect");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const movieListDiv = document.getElementById("movieList");
      movieListDiv.innerHTML = "";
      if (data.Response === "True") {
        const movie = data.Search.find(
          (movie) => movie.Title.toLowerCase() === searchQuery.toLowerCase()
        );
        if (movie) {
          const imdbID = movie.imdbID;
          const movieDetailUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
          fetch(movieDetailUrl)
            .then((response) => response.json())
            .then((detailData) => {
              const movieTitle = detailData.Title;
              const movieYear = detailData.Year;
              const movieGenre = detailData.Genre;
              const moviePlot = detailData.Plot;
              const movieActors = detailData.Actors;
              const moviePoster =
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150";

              const movieElement = `
                  <div class="card mt-5 mb-5 col-6">
                    <div class="card-body">
                        <img src="${moviePoster}" class="moviePoster" alt="Movie Poster"></img>;
                        <h2 class="movieTitle">${movieTitle} (${movieYear})</h2>
                        <p class="movieGenre">
                        <strong>Genre:</strong> ${movieGenre}
                        </p>
                        <p class="moviePlot">
                        <strong>Plot:</strong> ${moviePlot}
                        </p>
                        <p class="movieActors">
                        <strong>Actors:</strong> ${movieActors}
                        </p>
                    </div>
                  </div>
                `;
              movieListDiv.innerHTML = movieElement;
            })
            .catch((error) => {
              console.error("Error retrieving movie details:", error);
            });
        } else {
          movieListDiv.innerHTML = "<p>No results were found.</p>";
        }
      } else {
        movieListDiv.innerHTML = "<p>No results were found.</p>";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the find operation:", error);
    });
}
