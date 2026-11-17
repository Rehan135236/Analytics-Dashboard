import { test, expect } from '@playwright/test'

test.describe('Nexus Wealth & Portfolio Analytics Platform Smoke Tests', () => {
  test('should render Institutional Portfolio Dashboard with live market ticker and AUM cards', async ({ page }) => {
    await page.goto('/')

    // Expect live financial ticker bar
    await expect(page.getByText('MARKETS:')).toBeVisible()
    await expect(page.getByText('S&P 500')).toBeVisible()

    // Expect header & portfolio AUM
    await expect(page.locator('h1')).toContainText('Institutional Portfolio Overview')
    await expect(page.getByText('Total Portfolio AUM')).toBeVisible()
    await expect(page.getByText('Total Unrealized Return')).toBeVisible()

    // Expect navigation sidebar
    await expect(page.getByText('Nexus')).toBeVisible()
  })

  test('should navigate to Holdings & Orders and search assets', async ({ page }) => {
    await page.goto('/data')

    await expect(page.locator('h1')).toContainText('Holdings & Position Ledger')

    // Search for NVDA ticker
    const searchInput = page.getByPlaceholder('Search ticker, company, or sector...')
    await searchInput.fill('NVDA')

    await expect(page.getByText('NVIDIA Corporation')).toBeVisible()
  })

  test('should navigate to Real-Time Market Telemetry and see live quotes', async ({ page }) => {
    await page.goto('/monitoring')

    await expect(page.locator('h1')).toContainText('Real-Time Market Telemetry')
    await expect(page.getByText('Order Processing Rate')).toBeVisible()
    await expect(page.getByText('Live Order Execution Tape')).toBeVisible()
  })

  test('should switch theme mode in Settings', async ({ page }) => {
    await page.goto('/settings')

    await expect(page.locator('h1')).toContainText('System Settings')
    const darkButton = page.getByRole('button', { name: 'Dark Mode' })
    await darkButton.click()

    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
