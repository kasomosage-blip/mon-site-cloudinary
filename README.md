# Galerie Cloudinary

Une petite galerie web responsive qui présente trois images hébergées sur Cloudinary. Elle comprend un carrousel avec lecture automatique, commandes manuelles et prise en compte de la préférence de réduction des animations.

## Liens du projet

- **Dépôt GitHub :** https://github.com/kasomosage-blip/mon-site-cloudinary
- **Site publié :** https://kasomosage-blip.github.io/mon-site-cloudinary/

## Technologies utilisées

- HTML5 pour la structure de la page
- CSS3 pour la mise en page, les couleurs, les animations et l'adaptation aux écrans mobiles
- JavaScript pour le carrousel et ses commandes
- Cloudinary pour l'hébergement et la diffusion des images

## Utilisation de Cloudinary

Les images de la galerie sont chargées depuis des URL de livraison Cloudinary directement dans les balises `<img>` de `index.html`. Cloudinary héberge et diffuse les fichiers; le navigateur récupère les images à partir de ces URL. Ce projet n'utilise pas l'API d'envoi d'images et ne requiert donc ni clé secrète ni fichier de configuration.

## Exécution locale

1. Téléchargez ou clonez le dépôt.
2. Ouvrez le dossier du projet.
3. Lancez un serveur local dans ce dossier. Avec Python :

   ```powershell
   python -m http.server 8000
   ```

4. Ouvrez http://localhost:8000 dans votre navigateur.

Vous pouvez aussi ouvrir directement `index.html`, mais un serveur local est recommandé.

## Publication

Le workflow GitHub Actions du dossier `.github/workflows` publie le site sur GitHub Pages après chaque mise à jour de la branche `main`. Dans les paramètres du dépôt, sélectionnez **Settings > Pages > Build and deployment > Source > GitHub Actions** pour activer la première publication.
