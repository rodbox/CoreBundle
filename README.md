# RBCoreBundle :

Core pour RB en version Alphass

## routing :
```
rb_core:
    resource: "@RBCoreBundle/Controller/"
    type:     annotation
    prefix:   /
```

## config :
```
    - { resource: "@RBCoreBundle/Resources/config/services.yml" }
```

## AppKernel.php :
```
 public function registerBundles()
    {
        $bundles = [
           ...
            new RB\CoreBundle\RBCoreBundle(),
            new Knp\Bundle\PaginatorBundle\KnpPaginatorBundle(),
            new Knp\Bundle\MarkdownBundle\KnpMarkdownBundle(),
```

# Important : créer les fichiers :
- /app/config/rb_config.yml
- /app/config/rb_config.yml.dist
Ils doivent contenir les liens absolue et les urls vers les différents dossier et fichiers de l'application RB.




configuration knpPaginator :

[https://github.com/KnpLabs/KnpPaginatorBundle](https://github.com/KnpLabs/KnpPaginatorBundle)

configuration knpMarkdown :

[http://github.com/KnpLabs/KnpMarkdownBundle](http://github.com/KnpLabs/KnpMarkdownBundle)
configuration du service
```
php bin/console config:dump-reference knp_markdown
```

Si a l'update de composer :
```
[RuntimeException]
  Failed to execute git status --porcelain --untracked-files=no
  xcrun: error: invalid active developer path (/Library/Developer/CommandLineTool
  s), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

installer :

```
sudo xcode-select --install
```