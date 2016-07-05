<?php

namespace RB\CoreBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AlertControllerTest extends WebTestCase
{
    public function testAdd()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/add');
    }

    public function testUpd()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/upd');
    }

    public function testDel()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/del');
    }

    public function testReload()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/reload');
    }

}
