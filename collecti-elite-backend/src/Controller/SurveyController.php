<?php

namespace App\Controller;
use App\Entity\User;
use App\Entity\Survey;
use App\Entity\SurveyResponse;
use App\Repository\UserRepository;
use App\Repository\SurveyRepository;
use App\Repository\SurveyResponseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use DateTime;

class SurveyController extends AbstractController
{
    #[Route('/create-survey', name: 'app_create_survey')]
    public function createSurvey(Request $request, NormalizerInterface $Normalizer, SurveyRepository $surveyRepository, UserRepository $userRepository)
    {
        $data = json_decode($request->getContent(), true);
        

        $creatorId = $data['creatorId'];
        $creator = $userRepository->find($creatorId);
        $surveySchema = $data['surveySchema'];
        $currentDateTime = new DateTime();

        // Create and save the UserData entity
        $survey = new Survey();
        $survey->setUser($creator);
        $survey->setSchema($surveySchema);
        $survey->setCreatedAt($currentDateTime);

        $surveyRepository->save($survey, true);

        return new JsonResponse(['message' => 'Survey saved successfully']);
    }

    #[Route('/survey-info/{id}', name: 'app_survey_info', methods: ['GET', 'POST'])]
    public function surveyInfo($id, SurveyRepository $surveyRepository, NormalizerInterface $normalizer)
    {
        $survey= $surveyRepository->find($id);
        $surveyNorm =  $normalizer->normalize($survey,'json');
        $json=json_encode($surveyNorm);
        return New Response($json);
    }

    #[Route('/survey-list', name: 'app_survey_list', methods: ['GET', 'POST'])]
    public function surveyList(Request $request, NormalizerInterface $Normalizer, SurveyRepository $surveyRepository)
    {
        $list = $surveyRepository->findAll();
        $listNorm = $Normalizer->normalize($list, 'json');

        $json = json_encode($listNorm);

        return new Response($json);
    }

    #[Route('/survey-list-user/{id}', name: 'app_survey_list_user', methods: ['GET', 'POST'])]
    public function surveyListUser($id, SurveyRepository $surveyRepository, NormalizerInterface $Normalizer, UserRepository $userRepository)
    {
        $user= $userRepository->find($id);
        $surveys = $surveyRepository->findBy(['user' => $user]);
        
        $listNorm = $Normalizer->normalize($surveys, 'json');
        $json = json_encode($listNorm);
        return new Response($json);
    }

    #[Route('/participate-survey', name: 'app_participate_survey', methods: ['GET', 'POST'])]
    public function participateSurvey(Request $request, NormalizerInterface $Normalizer, SurveyRepository $surveyRepository, UserRepository $userRepository, SurveyResponseRepository $srRepository)
    {
        $data = json_decode($request->getContent(), true);
        

        $participantId = $data['participantId'];
        $participant = $userRepository->find($participantId);
        $surveyId = $data['survId'];
        $survey = $surveyRepository->find($surveyId);
        $responseSchema = $data['responseSchema'];
        $currentDateTime = new DateTime();

        // Create and save the response entity
        $surveyResponse = new SurveyResponse();
        $surveyResponse->setUser($participant);
        $surveyResponse->setResponseSchema($responseSchema);
        $surveyResponse->setSurvey($survey);

        $srRepository->save($surveyResponse, true);

        return new JsonResponse(['message' => 'Response saved successfully']);
    }

    #[Route('/response-list-survey/{id}', name: 'app_response_list_survey', methods: ['GET', 'POST'])]
    public function responseListSurvey($id, SurveyRepository $surveyRepository, NormalizerInterface $Normalizer, SurveyResponseRepository $srRepository)
    {
        $survey = $surveyRepository->find($id);
        $listResp = $srRepository->findBy(['survey' => $survey]);
        
        $listNorm = $Normalizer->normalize($listResp, 'json');
        $json = json_encode($listNorm);
        return new Response($json);
    }
}
