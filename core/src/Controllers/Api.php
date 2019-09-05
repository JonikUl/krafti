<?php

namespace App\Controllers;

use App\Model\User;
use Exception;
use Firebase\JWT\JWT;
use Psr\Log\LogLevel;
use RuntimeException;

/**
 * @OA\Info(title="Krafti API", version="1.0")
 *
 * @OA\Response(
 *        response="default",
 *        description="unexpected error",
 *        @OA\Schema(ref="#/components/schemas/Error")
 *    )
 */
class Api
{

    /** @var \App\Container */
    protected $container;


    public function __construct($container)
    {
        $this->container = $container;
    }


    /**
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param array $args
     *
     * @return \Slim\Http\Response
     */
    public function process($request, $response, $args = [])
    {
        $name = preg_replace_callback('#-(\w)#s', function ($matches) use ($args) {
            return ucfirst($matches[1]);
        }, $args['name']);
        $class = '\App\Processors\\' . implode('\\', array_map('ucfirst', explode('/', $name)));
        if (!class_exists($class)) {
            return (new \App\Processor($this->container))->failure('Запрошен неизвестный метод "' . $args['name'] . '"');
        }

        $this->container->loadUser();
        /** @var \App\Processor $processor */
        $processor = new $class($this->container);

        return $processor->process();
    }
}