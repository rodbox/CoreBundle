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
```

configuration knpPaginator :

[https://github.com/KnpLabs/KnpPaginatorBundle](https://github.com/KnpLabs/KnpPaginatorBundle)

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