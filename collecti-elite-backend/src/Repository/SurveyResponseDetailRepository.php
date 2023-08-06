<?php

namespace App\Repository;

use App\Entity\SurveyResponseDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SurveyResponseDetail>
 *
 * @method SurveyResponseDetail|null find($id, $lockMode = null, $lockVersion = null)
 * @method SurveyResponseDetail|null findOneBy(array $criteria, array $orderBy = null)
 * @method SurveyResponseDetail[]    findAll()
 * @method SurveyResponseDetail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SurveyResponseDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SurveyResponseDetail::class);
    }

//    /**
//     * @return SurveyResponseDetail[] Returns an array of SurveyResponseDetail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SurveyResponseDetail
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
