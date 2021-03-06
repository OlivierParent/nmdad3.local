<?php

namespace AppBundle\Form\Article;

use AppBundle\Entity\Article;
use AppBundle\Entity\Category;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NewType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('body')
            ->add('categories', 'entity', [
                'class' => Category::class,
                'choice_label' => 'name',
                'expanded' => false,
                'multiple' => true,
            ]);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }

    /**
     * Form name.
     *
     * @return string
     */
    public function getName()
    {
        return 'appbundle_article_new';
    }
}
