import { test, expect } from '@playwright/test'

test.describe('Nexus Analytics Enterprise Platform Smoke Tests', () => {
  test('should render Executive Dashboard with KPI cards and Recharts canvas', async ({ page }) => {
    await page.goto('/')

    // Expect page title or header
    await expect(page.locator('h1')).toContainText('Executive Dashboard')

    // Expect KPI metric cards to render
    await expect(page.getByText('Total Gross Revenue')).toBeVisible()
    await expect(page.getByText('Active Subscriptions')).toBeVisible()

    // Expect navigation sidebar
    await expect(page.getByText('Nexus')).toBeVisible()
  })

  test('should navigate to Data Management and perform table filtering', async ({ page }) => {
    await page.goto('/data')

    // Expect title
    await expect(page.locator('h1')).toContainText('Data Management')

    // Search for a specific cluster
    const searchInput = page.getByPlaceholder('Search records by name, code...')
    await searchInput.fill('Kafka')

    // Assert filtered row visibility
    await expect(page.getByText('Real-Time Pipeline Broker')).toBeVisible()
  })

  test('should navigate to Real-Time Telemetry and display live stream', async ({ page }) => {
    await page.goto('/monitoring')

    await expect(page.locator('h1')).toContainText('Real-Time Telemetry')
    await expect(page.getByText('Stream Throughput')).toBeVisible()
    await expect(page.getByText('Live Cluster Ingestion Stream')).toBeVisible()
  })

  test('should switch theme mode in Settings', async ({ page }) => {
    await page.goto('/settings')

    await expect(page.locator('h1')).toContainText('System Settings')
    const lightButton = page.getByRole('button', { name: 'Light Mode' })
    await lightButton.click()

    // Expect html tag to have light class
    await expect(page.locator('html')).toHaveClass(/light/)
  })
})
