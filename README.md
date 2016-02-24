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
```