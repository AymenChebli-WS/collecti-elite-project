<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
//use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;


class UserControllerJSON extends AbstractController
{
    //Users List
    #[Route('/userlist', name: 'app_user_json_index', methods: ['GET', 'POST'])]
    public function jsonIndex(Request $request, NormalizerInterface $Normalizer, UserRepository $userRepository)
    {
        $users = $userRepository->findAll();
        $usersNorm = $Normalizer->normalize($users, 'json');

        $json = json_encode($usersNorm);

        return new Response($json);
    }

    // Add User
    #[Route('/usernew', name: 'app_user_json_new')]
    public function jsonNew(Request $request, NormalizerInterface $Normalizer, UserRepository $userRepository)
    {
        // http://127.0.0.1:8000/usernew?role=Tester&nom=testnom&prenom=testprenom&email=test@mail.com&password=pass123&address=addr1&image=ha&birthday=01/01/2024
        
        $user = new User();
        $user->setRole('user');
        $user->setNom($request->get('nom'));
        $user->setPrenom($request->get('prenom'));
        $user->setEmail($request->get('email'));
        $user->setAddress($request->get('address'));
        $user->setImage('');
        $user->setPassword($request->get('password'));

        $birthDateString = $request->get('birthday');
        $format = 'd/m/Y';
        $birthdate = \DateTime::createFromFormat($format, $birthDateString);
        $user->setBirthday($birthdate);

        
        
        $userRepository->save($user, true);

        // $json = $Normalizer->normalize($event, 'json');
        // return new Response(json_encode($json));
        $jsonContent = $Normalizer->normalize($user, 'json', ['groups' => 'users']);
        return new Response(json_encode($jsonContent));
    }

    #[Route('/userlogin', name: 'app_login', methods: ['GET', 'POST'])]
    public function jsonLogin(Request $request, NormalizerInterface $Normalizer, UserRepository $userRepository, PersistenceManagerRegistry $doctrine)
    {
        $data = json_decode($request->getContent(), true);

        // Find the user by email
        $user = $doctrine->getRepository(User::class)->findOneBy([
            'email' => $request->get('email'),
        ]);

        if (!$user) {
            return new JsonResponse(['error' => 'Email not found'], 404);
        }

        // Validate the password
        if (!($request->get('password') == $user->getPassword())) {
            return new JsonResponse(['error' => 'Invalid password'], 401);
        }

        // // Replace 'your_session_key' with your custom session key
        // $this->get('session')->set('your_session_key', $user->getId());

        return new JsonResponse(['userId' => $user->getUserId()]);   
    }

    #[Route('/userinfo/{id}', name: 'app_user_info', methods: ['GET', 'POST'])]
    public function jsonShow($id, UserRepository $userRepository, NormalizerInterface $normalizer)
    {
        $user= $userRepository->find($id);
        $userNorm =  $normalizer->normalize($user,'json');
        $json=json_encode($userNorm);
        return New Response($json);
    }
}
