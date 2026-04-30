<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SalesPageController extends Controller
{
    // Dummy in-memory store (simulates DB)
    private static array $dummyPages = [];

    private function getDummyPages(): array
    {
        return [
            [
                'id' => 1,
                'product_name' => 'ProTask Manager',
                'status' => 'completed',
                'created_at' => '2026-04-25T10:00:00Z',
                'input' => [
                    'product_name' => 'ProTask Manager',
                    'description' => 'A powerful project management tool for remote teams',
                    'features' => 'Real-time collaboration, Kanban boards, Time tracking, Analytics',
                    'target_audience' => 'Remote teams and project managers',
                    'price' => '$29/month',
                    'usp' => 'The only tool that combines task management with built-in time tracking',
                ],
                'content' => $this->getDummyGeneratedContent('ProTask Manager', '$29/month'),
            ],
            [
                'id' => 2,
                'product_name' => 'FitCoach AI',
                'status' => 'completed',
                'created_at' => '2026-04-26T14:30:00Z',
                'input' => [
                    'product_name' => 'FitCoach AI',
                    'description' => 'Personalized AI fitness coaching app',
                    'features' => 'Custom workout plans, Nutrition tracking, Progress analytics, Live coaching',
                    'target_audience' => 'Fitness enthusiasts and beginners',
                    'price' => '$19/month',
                    'usp' => 'AI-powered coaching that adapts to your fitness level every week',
                ],
                'content' => $this->getDummyGeneratedContent('FitCoach AI', '$19/month'),
            ],
        ];
    }

    private function getDummyGeneratedContent(string $productName, string $price): array
    {
        return [
            'headline' => "Transform Your Life with {$productName} — The Future is Here",
            'sub_headline' => "Join thousands of satisfied customers who have already experienced the difference.",
            'description' => "{$productName} is a revolutionary solution designed to help you achieve more in less time. Built with cutting-edge technology and backed by real results, it's everything you need — and nothing you don't.",
            'benefits' => [
                'Save 10+ hours every week with automated workflows',
                'Increase productivity by up to 300% in the first month',
                'Get started in minutes with zero technical knowledge required',
                'Access premium support 24/7 whenever you need help',
            ],
            'features' => [
                ['title' => 'Smart Automation', 'description' => 'Let AI handle the repetitive tasks so you can focus on what matters.'],
                ['title' => 'Real-time Analytics', 'description' => 'Get instant insights with beautiful dashboards and reports.'],
                ['title' => 'Team Collaboration', 'description' => 'Work seamlessly with your team no matter where they are.'],
                ['title' => 'Secure & Reliable', 'description' => '99.9% uptime guarantee with enterprise-grade security.'],
            ],
            'social_proof' => [
                ['name' => 'Sarah Johnson', 'role' => 'CEO at TechStartup', 'quote' => "This completely transformed how our team works. We can't imagine going back."],
                ['name' => 'Michael Chen', 'role' => 'Freelance Designer', 'quote' => 'I doubled my client capacity within the first month. Absolutely incredible.'],
                ['name' => 'Emma Williams', 'role' => 'Marketing Director', 'quote' => 'The ROI was immediate. Best investment we made this year.'],
            ],
            'pricing' => [
                'price' => $price,
                'billing' => 'per month',
                'guarantee' => '30-day money-back guarantee',
                'includes' => ['Full access to all features', 'Priority customer support', 'Free updates forever', 'Onboarding assistance'],
            ],
            'cta' => [
                'primary' => "Start Your Free Trial Today",
                'secondary' => 'No credit card required · Cancel anytime',
            ],
        ];
    }

    public function index(Request $request)
    {
        $pages = $this->getDummyPages();

        if ($request->has('search') && $request->search) {
            $search = strtolower($request->search);
            $pages = array_filter($pages, function ($page) use ($search) {
                return str_contains(strtolower($page['product_name']), $search);
            });
        }

        return response()->json([
            'data' => array_values($pages),
            'total' => count($pages),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'required|string',
            'target_audience' => 'required|string',
            'price' => 'required|string',
            'usp' => 'nullable|string',
        ]);

        // Simulate AI generation delay
        sleep(1);

        $content = $this->getDummyGeneratedContent($request->product_name, $request->price);

        // Customize dummy content with real input
        $content['headline'] = "Introducing {$request->product_name}: The Ultimate Solution for {$request->target_audience}";
        $content['sub_headline'] = "Stop struggling with the old way. {$request->product_name} makes it effortless.";
        $content['description'] = $request->description . ' Trusted by thousands of professionals worldwide.';

        $newPage = [
            'id' => rand(100, 999),
            'product_name' => $request->product_name,
            'status' => 'completed',
            'created_at' => now()->toISOString(),
            'input' => $request->only(['product_name', 'description', 'features', 'target_audience', 'price', 'usp']),
            'content' => $content,
        ];

        return response()->json([
            'message' => 'Sales page generated successfully',
            'data' => $newPage,
        ], 201);
    }

    public function show(string $id)
    {
        $pages = $this->getDummyPages();
        $page = collect($pages)->firstWhere('id', (int) $id);

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        return response()->json(['data' => $page]);
    }

    public function destroy(string $id)
    {
        return response()->json(['message' => 'Sales page deleted successfully']);
    }

    public function regenerateSection(Request $request, string $id)
    {
        $request->validate([
            'section' => 'required|in:headline,sub_headline,description,benefits,features,cta',
        ]);

        $pages = $this->getDummyPages();
        $page = collect($pages)->firstWhere('id', (int) $id);
        $productName = $page['product_name'] ?? 'Your Product';

        $content = $this->getDummySectionContent($request->section, $productName);

        return response()->json([
            'message' => 'Section regenerated successfully',
            'section' => $request->section,
            'content' => $content,
        ]);
    }

    private function getDummySectionContent(string $section, string $productName): mixed
    {
        $variants = [
            'headline' => [
                "🚀 {$productName}: The #1 Solution Professionals Can't Stop Talking About",
                "Finally — A Better Way to Succeed with {$productName}",
                "{$productName} Changes Everything. Here's Why.",
                "Stop Settling. Start Winning with {$productName}.",
            ],
            'sub_headline' => [
                "Trusted by 50,000+ professionals in 120+ countries.",
                "The fastest-growing platform in its category — for good reason.",
                "Join the movement. See results in your first week.",
                "Built for people who refuse to accept 'good enough'.",
            ],
            'description' => [
                "{$productName} was built from the ground up to solve the real problems that slow you down. No bloat, no fluff — just results.",
                "What if getting more done felt effortless? That's exactly what {$productName} delivers, every single day.",
                "Thousands of teams switched to {$productName} and never looked back. Now it's your turn to experience the difference.",
            ],
            'benefits' => [
                ['Cut your workload in half — guaranteed', 'Onboard your entire team in under 10 minutes', 'Get actionable insights, not just raw data', 'Scale from 1 to 10,000 users without friction'],
                ['Save 15+ hours every week on repetitive tasks', 'See ROI within your first 30 days or get a refund', 'Works seamlessly with tools you already use', 'World-class support available 24/7'],
                ['Eliminate bottlenecks before they happen', 'Automate the boring stuff, focus on what matters', 'Real-time data at your fingertips, always', 'Enterprise-grade reliability for teams of any size'],
            ],
            'features' => [
                [
                    ['title' => 'AI-Powered Insights', 'description' => 'Machine learning surfaces what matters most, so you can act fast.'],
                    ['title' => 'One-Click Integrations', 'description' => 'Connect 200+ tools in seconds with zero coding required.'],
                    ['title' => 'Custom Workflows', 'description' => 'Build processes that fit your team, not the other way around.'],
                    ['title' => 'Enterprise Security', 'description' => 'SOC 2 Type II certified with end-to-end encryption.'],
                ],
                [
                    ['title' => 'Smart Dashboards', 'description' => 'Visualize every metric that matters in one clean view.'],
                    ['title' => 'Automated Reports', 'description' => 'Get weekly summaries delivered straight to your inbox.'],
                    ['title' => 'Role-Based Access', 'description' => 'Control exactly who sees what with granular permissions.'],
                    ['title' => 'API Access', 'description' => 'Build custom integrations with our developer-friendly REST API.'],
                ],
            ],
            'cta' => [
                ['primary' => 'Claim Your Free 14-Day Trial', 'secondary' => 'No setup fees · No credit card required · Cancel anytime'],
                ['primary' => 'Get Started for Free Today', 'secondary' => 'Join 50,000+ teams already using ' . $productName],
                ['primary' => 'Start Your Free Trial Now', 'secondary' => '30-day money-back guarantee · No questions asked'],
            ],
        ];

        $options = $variants[$section];
        return $options[array_rand($options)];
    }

    public function regenerate(Request $request, string $id)
    {
        $pages = $this->getDummyPages();
        $page = collect($pages)->firstWhere('id', (int) $id);

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        $content = $this->getDummyGeneratedContent($page['product_name'], $page['input']['price']);
        $content['headline'] = "🔥 New: {$page['product_name']} Just Got Even Better";

        $page['content'] = $content;
        $page['created_at'] = now()->toISOString();

        return response()->json([
            'message' => 'Sales page regenerated successfully',
            'data' => $page,
        ]);
    }
}
