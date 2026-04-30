<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SalesPage;
use Illuminate\Http\Request;

class SalesPageController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()?->id ?? 1;

        $query = SalesPage::where('user_id', $userId)->latest();

        if ($request->filled('search')) {
            $query->where('product_name', 'like', '%' . $request->search . '%');
        }

        $pages = $query->get()->map(fn($p) => $this->formatPage($p));

        return response()->json([
            'data'  => $pages,
            'total' => $pages->count(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_name'    => 'required|string|max:255',
            'description'     => 'required|string',
            'features'        => 'required|string',
            'target_audience' => 'required|string',
            'price'           => 'required|string',
            'usp'             => 'nullable|string',
            'tone'            => 'nullable|string',
        ]);

        $userId = $request->user()?->id ?? 1;
        $input  = $request->only(['product_name', 'description', 'features', 'target_audience', 'price', 'usp', 'tone']);

        $content = $this->buildGeneratedContent($request->product_name, $request->price, $request->target_audience, $request->description);

        $page = SalesPage::create([
            'user_id'      => $userId,
            'product_name' => $request->product_name,
            'input_data'   => $input,
            'content'      => $content,
            'status'       => 'completed',
        ]);

        return response()->json([
            'message' => 'Sales page generated successfully',
            'data'    => $this->formatPage($page),
        ], 201);
    }

    public function show(Request $request, string $id)
    {
        $userId = $request->user()?->id ?? 1;
        $page   = SalesPage::where('id', $id)->where('user_id', $userId)->firstOrFail();

        return response()->json(['data' => $this->formatPage($page)]);
    }

    public function destroy(Request $request, string $id)
    {
        $userId = $request->user()?->id ?? 1;
        $page   = SalesPage::where('id', $id)->where('user_id', $userId)->firstOrFail();
        $page->delete();

        return response()->json(['message' => 'Sales page deleted successfully']);
    }

    public function regenerate(Request $request, string $id)
    {
        $userId = $request->user()?->id ?? 1;
        $page   = SalesPage::where('id', $id)->where('user_id', $userId)->firstOrFail();

        $input   = $page->input_data;
        $content = $this->buildGeneratedContent(
            $page->product_name,
            $input['price'] ?? '',
            $input['target_audience'] ?? '',
            $input['description'] ?? ''
        );
        $content['headline'] = "🔥 New: {$page->product_name} Just Got Even Better";

        $page->update(['content' => $content]);

        return response()->json([
            'message' => 'Sales page regenerated successfully',
            'data'    => $this->formatPage($page->fresh()),
        ]);
    }

    public function regenerateSection(Request $request, string $id)
    {
        $request->validate([
            'section' => 'required|in:headline,sub_headline,description,benefits,features,cta',
        ]);

        $userId = $request->user()?->id ?? 1;
        $page   = SalesPage::where('id', $id)->where('user_id', $userId)->firstOrFail();

        $sectionContent = $this->getDummySectionContent($request->section, $page->product_name);

        // Update hanya section yang diminta di dalam JSON content
        $content = $page->content;
        $content[$request->section] = $sectionContent;
        $page->update(['content' => $content]);

        return response()->json([
            'message' => 'Section regenerated successfully',
            'section' => $request->section,
            'content' => $sectionContent,
        ]);
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private function formatPage(SalesPage $page): array
    {
        return [
            'id'           => $page->id,
            'product_name' => $page->product_name,
            'status'       => $page->status,
            'created_at'   => $page->created_at->toISOString(),
            'input'        => $page->input_data,
            'content'      => $page->content,
        ];
    }

    private function buildGeneratedContent(string $productName, string $price, string $audience, string $description): array
    {
        return [
            'headline'    => "Introducing {$productName}: The Ultimate Solution for {$audience}",
            'sub_headline' => "Stop struggling with the old way. {$productName} makes it effortless.",
            'description' => $description . ' Trusted by thousands of professionals worldwide.',
            'benefits'    => [
                'Save 10+ hours every week with automated workflows',
                'Increase productivity by up to 300% in the first month',
                'Get started in minutes with zero technical knowledge required',
                'Access premium support 24/7 whenever you need help',
            ],
            'features'    => [
                ['title' => 'Smart Automation',    'description' => 'Let AI handle the repetitive tasks so you can focus on what matters.'],
                ['title' => 'Real-time Analytics', 'description' => 'Get instant insights with beautiful dashboards and reports.'],
                ['title' => 'Team Collaboration',  'description' => 'Work seamlessly with your team no matter where they are.'],
                ['title' => 'Secure & Reliable',   'description' => '99.9% uptime guarantee with enterprise-grade security.'],
            ],
            'social_proof' => [
                ['name' => 'Sarah Johnson', 'role' => 'CEO at TechStartup',     'quote' => "This completely transformed how our team works. We can't imagine going back."],
                ['name' => 'Michael Chen',  'role' => 'Freelance Designer',     'quote' => 'I doubled my client capacity within the first month. Absolutely incredible.'],
                ['name' => 'Emma Williams', 'role' => 'Marketing Director',     'quote' => 'The ROI was immediate. Best investment we made this year.'],
            ],
            'pricing'     => [
                'price'    => $price,
                'billing'  => 'per month',
                'guarantee' => '30-day money-back guarantee',
                'includes' => ['Full access to all features', 'Priority customer support', 'Free updates forever', 'Onboarding assistance'],
            ],
            'cta'         => [
                'primary'   => 'Start Your Free Trial Today',
                'secondary' => 'No credit card required · Cancel anytime',
            ],
        ];
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
                    ['title' => 'AI-Powered Insights',  'description' => 'Machine learning surfaces what matters most, so you can act fast.'],
                    ['title' => 'One-Click Integrations','description' => 'Connect 200+ tools in seconds with zero coding required.'],
                    ['title' => 'Custom Workflows',      'description' => 'Build processes that fit your team, not the other way around.'],
                    ['title' => 'Enterprise Security',   'description' => 'SOC 2 Type II certified with end-to-end encryption.'],
                ],
                [
                    ['title' => 'Smart Dashboards',  'description' => 'Visualize every metric that matters in one clean view.'],
                    ['title' => 'Automated Reports', 'description' => 'Get weekly summaries delivered straight to your inbox.'],
                    ['title' => 'Role-Based Access', 'description' => 'Control exactly who sees what with granular permissions.'],
                    ['title' => 'API Access',         'description' => 'Build custom integrations with our developer-friendly REST API.'],
                ],
            ],
            'cta' => [
                ['primary' => 'Claim Your Free 14-Day Trial',  'secondary' => 'No setup fees · No credit card required · Cancel anytime'],
                ['primary' => 'Get Started for Free Today',    'secondary' => "Join 50,000+ teams already using {$productName}"],
                ['primary' => 'Start Your Free Trial Now',     'secondary' => '30-day money-back guarantee · No questions asked'],
            ],
        ];

        $options = $variants[$section];
        return $options[array_rand($options)];
    }
}
