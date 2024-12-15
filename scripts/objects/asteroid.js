export const createAsteroids = (app, totalAsteroids = 10, spawnRate = 3000) => {
    const asteroids = [];
    let currentSpeed = 1; // Початкова швидкість
    let spawnedAsteroids = 0;

    // Функція для створення одного астероїда
    const spawnAsteroid = () => {
        const asteroid = new PIXI.Sprite(PIXI.Texture.from('assets/images/asteroid.png'));
        asteroid.width = 100;
        asteroid.height = 100;

        // Рандомне положення по горизонталі
        asteroid.x = Math.random() * (app.screen.width - asteroid.width);
        asteroid.y = -asteroid.height; // Початкова позиція (за межами екрану)
        app.stage.addChild(asteroid);
        asteroids.push(asteroid);
    };

    // Функція для створення групи астероїдів
    const spawnAsteroidGroup = () => {
        const asteroidsToSpawn = Math.min(2, totalAsteroids - spawnedAsteroids); // Спавнимо максимум 2 астероїди
        for (let i = 0; i < asteroidsToSpawn; i++) {
            spawnAsteroid();
            spawnedAsteroids++;
        }

        // Збільшуємо швидкість астероїдів
        currentSpeed += 0.5;

        // Зупиняємо спаун, якщо всі астероїди створені
        if (spawnedAsteroids >= totalAsteroids) {
            clearInterval(spawnInterval);
        }
    };

    // Спаун астероїдів кожні spawnRate мс
    const spawnInterval = setInterval(spawnAsteroidGroup, spawnRate);

    // Додаємо логіку руху астероїдів у `manageAsteroids`
    app.ticker.add(() => {
        for (let i = asteroids.length - 1; i >= 0; i--) {
            asteroids[i].y += currentSpeed; // Рух вниз зі змінною швидкістю

            // Видаляємо астероїд, якщо він виходить за межі екрана
            if (asteroids[i].y > app.screen.height) {
                app.stage.removeChild(asteroids[i]);
                asteroids.splice(i, 1);
            }
        }
    });

    return asteroids;
};


