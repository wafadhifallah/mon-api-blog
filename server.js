const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const articles = [
    { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
    { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
    { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];
const users = [
    { id: 1, name: 'Aya', email: 'aya@example.com' },
    { id: 2, name: 'Omar', email: 'omar@example.com' },
    { id: 3, name: 'Youssef', email: 'youssef@example.com' }
  ];

// Afficher tous les articles
// Possibilité de filtrer par auteur
app.get('/api/articles', (req, res) => {
    const { author } = req.query;

    let resultat = articles;

    if (author) {
        resultat = articles.filter(
            a => a.author === author
        );
    }

    res.json({
        total: resultat.length,
        articles: resultat
    });
});

// Afficher un article par son ID
app.get('/api/articles/:id', (req, res) => {
    const id = Number(req.params.id);

    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({
            error: `Article ${id} introuvable`
        });
    }

    res.json(article);
});
app.post('/api/articles', (req , res) => {
    const { title , author } = req.body ; // dé structuration (é tape 5)
    if (! title || ! author ) { // validation : les deux champs sont obligatoires
    return res.status(400).json ({ error : "Le titre et l'auteur sont obligatoires " }) ;
    }
    const nouvelArticle = { id: prochainId , title:title , author:author };
    prochainId = prochainId + 1;
    articles . push ( nouvelArticle ) ;
    res.status(201).json ({ message : 'Article créé', article : nouvelArticle }) ;
    });

// Page d'accueil
app.get('/', (req, res) => {
    res.json({ message: 'Bonjour' });
});
let prochainId = 4;
app.get('/about', (req, res) => {
    res.json({ application: 'API du blog', auteur: 'wafa', version: '1.0.0' });
  });
  app.get('/api/users', (req, res) => {
    const { name } = req.query;
    let resultat = users;
    if (name) {
      resultat = users.filter(u => u.name === name);
    }
    res.json(resultat);
  });
  app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
    }
    res.json(user);
  });
  app.post('/contact', (req, res) => {
    const { email, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ error: "L'email et le message sont obligatoires" });
    }
    res.status(200).json({ message: 'Merci, votre message a bien été reçu' });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});